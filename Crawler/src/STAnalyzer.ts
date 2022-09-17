import IAnalyzer from "./IAnalyzer";
import cheerio from "cheerio";
import fs from 'fs';

interface Software {
    title: string;
    desc: string;
}

interface SoftwareResult {
    time: number;
    data: Software[];
}

interface Content {
    [propName: number]: Software[]
}

export default class STAnalyzer implements IAnalyzer {
    //单例：
    private constructor() {
    }

    private static instance: STAnalyzer;

    public static GetInstance() {
        if (!STAnalyzer.instance) {
            this.instance = new STAnalyzer();
        }
        return this.instance;
    }

    public analyze(html: string, filePath: string): string {
        //拿到软件info
        const softwareInfos = this.getSoftwareInfos(html);
        //得到json信息
        const content = this.generateContent(softwareInfos, filePath);
        return JSON.stringify(content);
    }

    private generateContent(softResult: SoftwareResult, filePath: string): Content {
        let content: Content = {}
        if (fs.existsSync(filePath)) {
            content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        content[softResult.time] = softResult.data;
        return content;
    }

    private getSoftwareInfos(html: string): SoftwareResult {
        const $ = cheerio.load(html);
        const softItems = $('._wt-card__section_ru6f9_133');
        const softInfos: Software[] = [];

        softItems.map((index, element) => {
            const title = $(element).find("h3").first().text();
            const desc = $(element).find("p").first().text();
            softInfos.push({title, desc});
        });

        return {
            time: new Date().getTime(),
            data: softInfos
        }
    }

}

