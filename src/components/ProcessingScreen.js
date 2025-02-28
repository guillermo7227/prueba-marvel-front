import '../assets/ProcessingScreen.css';

function ProcessingScreen() {
    const componentId = 'ProcessingScreen';
    return (
        <div id={componentId} className="position-fixed rounded bg-dark bottom-50 start-50 translate-middle">
            🦸🏻‍♂️<br/>
            Procesando la petición.<br/>
            Por favor espere...
        </div>
    )
}

export default ProcessingScreen;