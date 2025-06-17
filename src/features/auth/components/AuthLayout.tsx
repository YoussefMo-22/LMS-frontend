import imageSrc from '../../../assets/authBackgound.png';

export default function AuthLayout({ children, imageVector, slogan }: {
    children: React.ReactNode;
    imageVector?: any;
    slogan?: string;
}) {
    return (
        <div className="flex flex-col md:flex-row h-auto md:h-screen">
            {/* Form Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-6">
                {children}
            </div>

            {/* Visual Section */}
            <div className="w-full md:w-1/2 relative hidden md:block">
                <img src={imageSrc} alt="Auth Visual" className="w-full h-full object-cover" />
                <div className='w-11/12 absolute bottom-0 right-0 flex flex-col items-center p-4'>
                    <h4 className='w-8/12 text-center text-white font-bold text-3xl md:text-4xl'>{slogan}</h4>
                    <div className='w-full'>
                        {imageVector}
                    </div>
                </div>
            </div>
        </div>
    );
}
