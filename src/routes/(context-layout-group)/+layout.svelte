<!-- this layout is available only to all pages inside context-layout-group  -->

<section>
    <a href="/context/normal-form">Normal Form</a>
    <a href="/context/context-form">Context Form</a> 
    <a href="/context/konva-imperative">Konva.js Imperative Way</a>
    <a href="/context/konva-context">Konva.js Context Way</a>
</section>
<slot/>

<style>
    section{
        display: flex;
        flex-direction: column;
    }
</style>