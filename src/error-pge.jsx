import {useRouteError} from 'react-router-dom'

const ErrorPge = () => {
    const error = useRouteError()
    console.log(error)

    return (
        <div id={'error-page'}>
            <h1>Ops something bad happened!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export {ErrorPge}