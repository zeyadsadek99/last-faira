<template>
    <div class="imaged_card_wrapper">
        <div class="image_wrapper">
            <slot name="card_image"></slot>
        </div>
        
        <div class="text_wrapper">
            <slot name="card_text"></slot>
            <slot name="instructor_card_data"></slot>
        </div>
    </div>
</template>
