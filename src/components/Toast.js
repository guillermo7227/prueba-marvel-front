function Toast() {
    return (
      <div class="position-fixed bottom-0 start-50 translate-middle p-3" style={{zIndex: 11}}>
            <div id="toast" class="toast hide text-white bg-primary" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>  
        </div>
    )
}

export default Toast;