import imageSrc from '../../../assets/authBackgound.png';
export default function AuthLayout({ children, imageVector, slogan }: {
    children: React.ReactNode;
    imageVector?: any;
    slogan?: string;
}) {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex justify-center items-center">
                {children}
            </div>
            <div className="w-1/2 relative">
                <img src={imageSrc} alt="Auth Visual" className="w-full h-full object-cover" />
                <div className='w-11/12 absolute bottom-0 right-0 flex flex-col items-center'>
                    <h4 className='w-8/12 text-center text-white font-bold text-4xl'>{slogan}</h4>
                    <div className='w-full'>
                        {imageVector}
                    </div>
                </div>
            </div>
        </div>
    );
}
