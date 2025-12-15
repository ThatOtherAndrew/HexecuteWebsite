import { FloatingDock } from '@/components/ui/floating-dock';
import {
    IconBrandGithub,
    IconDownload,
    IconHome,
    IconBug,
} from '@tabler/icons-react';

export default function Dock() {
    const links = [
        {
            title: 'Home',
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: '#',
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
                desktopClassName="scale-125 origin-bottom"
                mobileClassName="scale-150 origin-bottom"
            />
        </div>
    );
}
