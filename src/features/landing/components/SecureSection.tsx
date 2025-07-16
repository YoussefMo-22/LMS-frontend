import secureImg from '../../../assets/secure.png';
import book from '../../../assets/book.svg';
import like from '../../../assets/like.svg';
import ButtonUI from '../../../shared/components/UI/Button';
function SecureSection() {
    return (
        <div>
            <div className="container mx-auto py-16 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className='w-full'>
                    <img src={secureImg} alt="Secure" className="mx-auto mb-8" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-10 text-primary-400 text-center">
                        Secure. Scalable. Supportive.
                    </h2>
                    <p className="text-lg text-dark-400 mb-8 text-center">
                        Whether you're a solo learner or an entire institution, LevelUp gives you the tools you need to succeed — securely and seamlessly.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="flex items-center space-x-4">
                            <img src={book} alt="Book icon" />
                            <div className='space-y-2'>
                                <h6 className='text-primary-400 text-5xl font-bold'>6K</h6>
                                <p>Explore a world of knowledge  6,000+ courses await you!</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src={like} alt="Thumbs up icon" />
                            <div className='space-y-2'>
                                <h6 className='text-primary-400 text-5xl font-bold'>9/10</h6>
                                <p>Explore a world of knowledge  6,000+ courses await you!</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <ButtonUI className="px-16 text-white">Find out more</ButtonUI>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecureSection