interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="h-2 w-full bg-gray-200">
      <div
        className="h-full bg-mauve transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  )
}
