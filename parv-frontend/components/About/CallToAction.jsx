export default function CallToAction() {
    return (
        <section className="bg-blue-600 text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold">Ready to take the next step?</h2>
                <p className="mt-4">Join thousands of satisfied customers today and start your financial journey with us.</p>
                <div className="mt-6">
                    <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-md shadow-md hover:bg-gray-100">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
