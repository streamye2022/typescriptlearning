export default interface IAnalyzer {
    analyze: (html: string, filePath: string) => string
}