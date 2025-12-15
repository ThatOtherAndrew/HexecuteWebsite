import { Timeline } from '@/components/ui/timeline';
import hexecuteDemoVideo from '@/assets/hexecute_demo.mp4';

export default function Features() {
    const data = [
        {
            title: 'Cast.',
            description: 'foo bar baz',
            content: (
                <div>
                    <video autoPlay muted playsInline className="rounded-2xl">
                        <source src={hexecuteDemoVideo} type="video/mp4" />
                    </video>
                </div>
            ),
        },
    ];
    return (
        <div className="dark relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
