import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch(error => alert(error))
    }

    render() {
        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <div className="content">
                            <h1>Search</h1>
                            <form
                                name="search"
                                method="get"
                                action="/search"
                                data-netlify="true"
                                data-netlify-honeypot="bot-field"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="field">
                                    <label className="label" htmlFor={'name'}>
                                        Your name
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type={'text'}
                                            name={'name'}
                                            onChange={this.handleChange}
                                            id={'name'}
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <button className="button is-link" type="submit">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
