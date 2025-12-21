<script lang="ts">
    import { VinylRecord, PlaybackController } from 'virtual-vinyl';

    let speed = $state(0);
    const controller = new PlaybackController();

    $effect(() => {
        console.log('loaded');
        controller.loadFromUrl('/epic_molehill.wav');
    });
</script>

<div>
    <VinylRecord {controller} bind:speed img="https://picsum.photos/200" />
</div>
