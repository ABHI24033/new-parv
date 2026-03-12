const Icons = ({ active, completed }) => {
  return (
    <div className={`
      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
      ${completed ? 'bg-blue-600 text-white shadow-blue-200' : active ? 'bg-white border-2 border-blue-600 text-blue-600 shadow-blue-100' : 'bg-gray-100 border-2 border-gray-200 text-gray-400'}
    `}>
      {completed ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <span className="text-sm font-black">{active || !completed ? '●' : ''}</span>
      )}
    </div>
  );
};

const FormStepIndicator = ({ keys, step }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-10" />

        {/* Progress Line */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-700 ease-in-out -z-10"
          style={{ width: `${(step / (keys.length - 1)) * 100}%` }}
        />

        {keys.map((key, index) => {
          const isActive = step === index;
          const isCompleted = step > index;

          return (
            <div key={key} className="flex flex-col items-center gap-3 relative group">
              <Icons active={isActive} completed={isCompleted} />
              <div className="flex flex-col items-center">
                <span className={`
                  text-xs md:text-sm font-bold transition-all duration-300 tracking-tight
                  ${isActive ? 'text-blue-700 scale-110' : isCompleted ? 'text-gray-900' : 'text-gray-400'}
                `}>
                  {key}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-1 animate-ping" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepIndicator;
