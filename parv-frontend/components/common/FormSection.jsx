const FormSection = ({ title, subtitle, children, className = "" }) => (
    <div className={`mb-6 ${className}`}>
        <h3 className="pl-2 mb-1 text-lg text-blue-900 font-semibold tracking-tight">
            {title}
        </h3>
        {subtitle && (
            <p className="pl-2 mb-3 text-sm text-gray-600">
                {subtitle}
            </p>
        )}
        <div className="bg-gray-50 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 border border-gray-200 rounded-lg">
            {children}
        </div>
    </div>
);

export default FormSection;