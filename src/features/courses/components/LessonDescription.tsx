import ButtonUI from "../../../shared/components/UI/Button";

export default function LessonDescription() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Complete React Developer Course 2024</h1>
      <p className="text-gray-600">
        In this lesson, you'll learn about React components and JSX syntax. We'll explore how components are the building blocks of React applications and how JSX allows us to write HTML-like syntax in JavaScript. By the end of this lesson, you'll be able to create your own functional components and understand the fundamentals of React's component-based architecture.
      </p>
      <div className="flex justify-between mt-4">
        <ButtonUI className="bg-white border border-primary-400 px-8 text-primary-400">Previous Lesson</ButtonUI>
        <ButtonUI className="bg-primary-400 text-white">Next Lesson</ButtonUI>
      </div>
    </div>
  );
}
