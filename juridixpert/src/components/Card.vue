<template>
    <div class="card">
        <slot />
    </div>
</template>

<script>
export default {
    name:"Card",
}
</script>

<style scoped>
.card{
    background-color: #fffde7;
    padding: 1.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    margin-bottom: 0.8rem;
    font-size: 1rem;
    cursor: pointer;
}
</style>