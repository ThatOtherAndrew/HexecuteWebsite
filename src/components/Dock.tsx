import { FloatingDock } from '@/components/ui/floating-dock';
import {
    IconArticle,
    IconBrandGithub,
    IconBug,
    IconDownload,
} from '@tabler/icons-react';

export default function Dock() {
    const links = [
        {
            title: 'About',
            icon: (
                <IconArticle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: 'https://www.reddit.com/r/unixporn/comments/1o6jdez/oc_hexecute_i_made_a_magic_gesture_launcher_for/',
        },
        {
            title: 'Download',
            icon: (
                <IconDownload className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: 'https://github.com/ThatOtherAndrew/Hexecute/releases/latest',
        },
        {
            title: 'Issues',
            icon: (
                <IconBug className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: 'https://github.com/ThatOtherAndrew/Hexecute/issues',
        },
        {
            title: 'GitHub',
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: 'https://github.com/ThatOtherAndrew/Hexecute',
        },
    ];

    return (
        <div className="pointer-events-none absolute bottom-20">
            <FloatingDock items={links} className="origin-bottom scale-125" />
        </div>
    );
}
