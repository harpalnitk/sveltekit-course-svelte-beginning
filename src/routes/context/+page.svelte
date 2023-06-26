<!-- Context API allows us to pass data from parent to child
and vice versa without using props or eventDispatechers 

This can also be done through stores
but here the difference is that the 

context data will only be available to particular instance of parent
component
thus, if we have multiple parent components
each having it's own child they all will have there own
separate context data


in store we have same data across all application
-->
<section>
    <a href="/context/normal-form">Normal Form</a>
    <a href="/context/context-form">Context Form</a> 
    <a href="/context/konva-imperative">Konva.js Imperative Way</a>
    <a href="/context/konva-context">Konva.js Context Way</a>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
    }
</style>
