import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

export default function RequestDownloader({ content, filename, btnname, className, orientation }) {
    const printHandler = () => {
        const printElement = ReactDOMServer.renderToString(content);
        const options = {
            margin: [0, 0],
            filename: `${filename}.pdf`,
            jsPDF: {
                format: [180, 109.5],
                orientation: orientation === "potrait" ? 'potrait' : 'landscape',
                unit: 'mm'
            }
        };
        html2pdf().set(options).from(printElement).save();
    }

    return (
        <>
            <button onClick={printHandler} className={className}>{btnname}</button>
        </>
    );
}