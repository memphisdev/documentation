<template>
    <div class="card">
        <img class="card-image" src="./test-cover.png" alt="placeholder image">
        <div class="card-text">
            <h3>How to reduce your data traffic by 30%
instantly</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde nemo nihil voluptatibus, saepe quidem soluta deleniti ratione tempore et neque tenetur consectetur possimus, quam maiores fugiat quas eius quibusdam.</p>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>  
    .card{  
        background-color: #f6f6f7;
        border-radius: 8px;
        width: 369px;
        height: 320px;
    }

    :root.dark .card {
        background-color: #303034;
    }

    .card-text {
        padding-top: 28px;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #f6f6f7;
        height: 50%;    
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    :root.dark .card-text{
        background-color: #252529;
    }

    .card-text > h3{
        font-size: 20px;
        font-weight: 600;
    }

    .card-text > p{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; 
        overflow: hidden;
    }

    .card-image{
        height: 50%;
        width: 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

</style>