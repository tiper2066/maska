import SecMain from '@/components/home/SecMain';
import SecWhatMaska from '@/components/home/SecWhatMaska';
import SecLetsMaska from '@/components/home/SecLetsMaska';
import SecHowMaska from '@/components/home/SecHowMaska';
import SecUseCaseMaska from '@/components/home/SecUseCaseMaska';
import SecWhyMaska from '@/components/home/SecWhyMaska';

export default function Home() {
    return (
        <main className="page_top_margin">
            {/* ================ Section Main ================ */}
            <section className="section_home">
                <SecMain />
            </section>
            {/* ================ Section What ================ */}
            <section className="section_home">
                <div>
                    <SecWhatMaska />
                </div>
            </section>
            {/* ================ Section Let's ================ */}
            <section className="section_home">
                <div>
                    <SecLetsMaska />
                </div>
            </section>
            {/* ================ Section How ================ */}
            <section className="section_home">
                <div>
                    <SecHowMaska />
                </div>
            </section>
            {/* ================ Section Use Case ================ */}
            <section className="section_home">
                <div>
                    <SecUseCaseMaska />
                </div>
            </section>
            {/* ================ Section Why ================ */}
            <section className="section_home">
                <div>
                    <SecWhyMaska />
                </div>
            </section>
        </main>
    );
}
