<script lang="ts">
    import { VinylRecord, PlaybackController } from 'virtual-vinyl';

    let speed = $state(0);
    const controller = new PlaybackController();

    $effect(() => {
        controller.loadFromUrl('/epic_molehill.wav');
    });
</script>

<div
    onpointerdown={() => {
        speed = 1;
    }}
    class="absolute aspect-square w-70 top-0 left-0 -translate-x-40 -translate-y-40 rounded-full hover:-translate-x-10 hover:-translate-y-10 transition-transform duration-300 ease-out"
>
    <VinylRecord {controller} bind:speed img="/web-app-manifest-192x192.png" />
</div>
