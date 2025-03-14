import {Link, Outlet, useLoaderData, Form, redirect, useNavigation, useSubmit} from "react-router-dom"
import {getContacts, createContact} from "../contacts.js"
import {useEffect} from "react";

const action = async () => { // action =>  {request: Request, params: {…}, context: undefined}
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`)
}

const loader = async ({request}) => { // loader => {request: Request, params: {…}, context: undefined}
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    const contacts = await getContacts(q)
    return {contacts, q}
}

function Root() {
    const {contacts, q} = useLoaderData()
    const navigation = useNavigation()
    const submit = useSubmit()

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

    useEffect(() => {
        document.getElementById('search-form').value = q
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? 'loading': ''}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q === null
                                // currentTarget is the DOM node the event is attached to
                                // currentTarget.form is the input's parent form node
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch
                                })
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === 'loading' ? 'loading' : ''}
            >
                <Outlet/>
            </div>
        </>
    );
}

export {Root, loader, action}