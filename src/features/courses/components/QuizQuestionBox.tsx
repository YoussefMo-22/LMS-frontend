import { Circle } from "lucide-react";
import mark from "../../../assets/mark.svg";

interface Props {
  question: string;
  options: string[];
  selectedAnswer: number;
  onSelect: (index: number) => void;
}

export default function QuizQuestionBox({
  question,
  options,
  selectedAnswer,
  onSelect,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <ul className="space-y-3">
        {options.map((opt, i) => (
          <li
            key={i}
            onClick={() => onSelect(i)}
            className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 ${
              selectedAnswer === i
                ? "border-primary-400 bg-primary-50"
                : "border-gray-300"
            }`}
          >
            {selectedAnswer === i ? (
              <img src={mark} className="w-5 h-5" alt="" />
            ) : (
              <Circle size={20} className="text-gray-400" />
            )}
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
