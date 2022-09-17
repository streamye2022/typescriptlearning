import IAnalyzer from "./IAnalyzer";
// import superagent from "superagent";
import fs from "fs";
import path from 'path';
import STAnalyzer from "./STAnalyzer";

class Crawler {

    constructor(private url: string,
                private resultPath: string,
                private analyzer: IAnalyzer) {
        this.initSpiderProcess();
    }

    private async initSpiderProcess() {
        //获得html
        const html = await this.getRawHtml();
        //analyze html
        const analyzeResult = this.analyzer.analyze(html, this.resultPath);
        //write result
        this.writeFile(analyzeResult);
    }

    private writeFile(content: string) {
        fs.writeFileSync(this.resultPath, content);
    }

    private async getRawHtml() {
        // const result = await superagent.get(this.url);
        // return result.text;
        const result = '<div class="wt-section"><div class="wt-container"><div class="wt-row wt-row_size_m wt-row_align-items_stretch"><div class="wt-col-6 wt-col-md-12 other-tools__card-wrapper wt-offset-top-24"><a data-test="card" href="/zh-cn/space/solutions/software-teams/" class="_wt-card_ru6f9_1 _wt-card_theme_light_ru6f9_15 _wt-card_link_ru6f9_32 other-tools__card"><div data-test="cardSection" class="_wt-card__section_ru6f9_133"><div class="wt-row wt-row_align-items_center"><svg class="wt-col-inline other-tools__logo_small"><use href="#space"></use></svg><h3 class="other-tools__logo-title">Space</h3></div><p class="wt-h2 wt-offset-top-24 other-tools__title">适用于软件团队的一体化解决方案</p><p class="wt-subtitle-2 wt-text-2_hardness_average wt-offset-top-24">获取开发软件和与团队协作所需的完整工具链。</p><button data-test="button" type="button" class="_wt-button_5oj105_1 _wt-button_mode_primary_5oj105_180 _wt-button_size_m_5oj105_96 _wt-button_theme_light_5oj105_77 wt-button_align-icon_left other-tools__button">了解详情</button></div></a></div><div class="wt-col-6 wt-col-md-12 other-tools__card-wrapper"><div class="wt-row wt-row_size_m wt-row_wrap"><div class="wt-col-6 wt-col-sm-12 other-tools__card-wrapper wt-offset-top-24"><a data-test="card" href="/zh-cn/idea" class="_wt-card_ru6f9_1 _wt-card_theme_light_ru6f9_15 _wt-card_link_ru6f9_32 other-tools__card"><div data-test="cardSection" class="_wt-card__section_ru6f9_133"><svg class="other-tools__logo"><use href="#intellij-idea"></use></svg><h3 class="wt-h3 wt-offset-top-12">IntelliJ IDEA</h3><p class="wt-text-2 wt-text-2_hardness_average wt-offset-top-12">最智能的 JVM IDE</p></div></a></div><div class="wt-col-6 wt-col-sm-12 other-tools__card-wrapper wt-offset-top-24"><a data-test="card" href="/zh-cn/datagrip" class="_wt-card_ru6f9_1 _wt-card_theme_light_ru6f9_15 _wt-card_link_ru6f9_32 other-tools__card"><div data-test="cardSection" class="_wt-card__section_ru6f9_133"><svg class="other-tools__logo"><use href="#datagrip"></use></svg><h3 class="wt-h3 wt-offset-top-12">DataGrip</h3><p class="wt-text-2 wt-text-2_hardness_average wt-offset-top-12">多种数据库，一个工具</p></div></a></div><div class="wt-col-6 wt-col-sm-12 other-tools__card-wrapper wt-offset-top-24"><a data-test="card" href="/zh-cn/teamcity" class="_wt-card_ru6f9_1 _wt-card_theme_light_ru6f9_15 _wt-card_link_ru6f9_32 other-tools__card"><div data-test="cardSection" class="_wt-card__section_ru6f9_133"><svg class="other-tools__logo"><use href="#teamcity"></use></svg><h3 class="wt-h3 wt-offset-top-12">TeamCity</h3><p class="wt-text-2 wt-text-2_hardness_average wt-offset-top-12">开箱即用的强大持续集成</p></div></a></div><div class="wt-col-6 wt-col-sm-12 other-tools__card-wrapper wt-offset-top-24"><a data-test="card" href="/zh-cn/youtrack" class="_wt-card_ru6f9_1 _wt-card_theme_light_ru6f9_15 _wt-card_link_ru6f9_32 other-tools__card"><div data-test="cardSection" class="_wt-card__section_ru6f9_133"><svg class="other-tools__logo"><use href="#youtrack"></use></svg><h3 class="wt-h3 wt-offset-top-12">YouTrack</h3><p class="wt-text-2 wt-text-2_hardness_average wt-offset-top-12">为所有团队提供强大的项目管理</p></div></a></div></div></div></div></div></div>'
        return result;
    }

}

const url = "http://www.jetbrains.com/zh-cn/webstorm/download/download-thanks.html?platform=mac";
const resultPath = path.resolve(__dirname, '../data/result.json');
const crawler = new Crawler(url, resultPath, STAnalyzer.GetInstance())