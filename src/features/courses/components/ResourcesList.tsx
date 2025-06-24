import note from '../../../assets/note.svg'
import download from '../../../assets/document-download.svg'

const files = [
    { name: "Lesson 1 - Introduction to React.pdf", size: "2.4 MB" },
    { name: "Lesson 1 - Introduction to React.pdf", size: "2.4 MB" },
    { name: "Lesson 1 - Introduction to React.pdf", size: "2.4 MB" },
];

export default function ResourcesList() {
    return (
        <div>
            <h2 className="text-xl flex items-center gap-2 font-semibold mb-4"><img src={note} alt="" /> Lesson Resources</h2>
            <ul className="space-y-3">
                {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                            <img src={download} alt="" />
                            <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-gray-500">{file.size}</p>
                            </div>
                        </div>
                        <button className="text-white bg-primary-500 rounded-xl py-2 px-4 flex items-center gap-2 font-semibold">
                            Download
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
