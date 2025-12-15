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
            href: '#about',
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
        <div className="dark absolute bottom-20">
            <FloatingDock
                items={links}
                desktopClassName="!flex scale-125 origin-bottom"
                mobileClassName="!hidden scale-150 origin-bottom"
            />
        </div>
    );
}
