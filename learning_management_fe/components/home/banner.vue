<template>
    <div class="pt-[80px]">
        <div class="relative">
            <div class="w-[350px] xl:w-[450px] bg-sec absolute top-0 left-0 bottom-0 rounded-tr-full rounded-br-full"></div>
            <div class="container min-h-[600px] pt-[10px] lg:pt-0 flex lg:items-center gap-5">
                <div class="z-10">
                    <p class="heading-lg w-full relative">A New Way of Digital Literacy.</p>
                    <p class="mt-5 my-10">Introduces a fresh approach to learning essential digital skills. Our online platform makes it easy for anyone to gain the knowledge needed to navigate the digital world confidently. Whether you're just starting or looking to enhance your skills, our courses are designed to help you succeed.</p>
                    <NuxtLink class="px-5 py-5 font-bold rounded-3xl bg-prim text-white" to="/courses">Explore Courses</NuxtLink>
                </div>
                <div
                    class="w-full sm:w-[500px] xl:w-[600px] flex-shrink-0 flex items-end absolute bottom-0 right-0 lg:relative z-0">
                    <NuxtImg class="w-full" src="./public-assets/home/banner-1.png" loading="lazy" />
                </div>
            </div>
        </div>
    </div>
</template>