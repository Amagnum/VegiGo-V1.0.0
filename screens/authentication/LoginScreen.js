import * as React from 'react'
import { Text, View, ScrollView, TextInput, Button, WebView } from 'react-native'
import { Linking, WebBrowser } from 'expo'
//import * as WebBrowser from 'expo-web-browser'
import firebase from 'firebase/app'
import 'firebase/auth'

const captchaUrl = `https://vegigo-198a7.firebaseapp.com/index.html?appurl=${Linking.makeUrl('')}`


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: this.props.navigation.state.params.mobileN,
            confirmationResult: undefined,
            code: '',
            isOrderPlaced: 0
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
        })
    }

    onPhoneChange = (phone) => {
        this.setState({ phone })
    }

    onPhoneComplete = async () => {
        let token = null
        const listener = ({ url }) => {
            WebBrowser.dismissBrowser()
            const tokenEncoded = Linking.parse(url).queryParams['token']
            if (tokenEncoded)
                token = decodeURIComponent(tokenEncoded)
        }
        Linking.addEventListener('url', listener)
        WebBrowser.dismissBrowser()
        await WebBrowser.openBrowserAsync(captchaUrl)
       Linking.removeEventListener('url', listener)

        if (token) {
            const { phone } = this.state

            //fake firebase.auth.ApplicationVerifier
            const captchaVerifier = {
                type: 'recaptcha',
                verify: () => Promise.resolve(token)
            }
            try {
                const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
                this.setState({ confirmationResult })
            } catch (e) {
                console.warn('confirmationResult:' + e)
            }

        }
    }
    onCodeChange = (code) => {
        this.setState({ code })
    }

    onSignIn = async () => {
        const { confirmationResult, code } = this.state
        try {
            await confirmationResult.confirm(code).then(() => {
                this.reset()
                this.props.navigation.state.params.placeOrder()
                this.props.navigation.navigate("ConfirmationScreen")
            })
        }
        catch (e) {
            console.warn(e)
            alert('Verification code does not matched \n Please Try again')
        }
    }

    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    placeOneOrder = () => {
        this.setState({
            isOrderPlaced: 1
        })
        this.props.navigation.state.params.placeOrder()
        this.props.navigation.navigate("ConfirmationScreen")
    }

    render() {
        if (!this.props.navigation.state.params.isMobileSame) {
            if (!this.state.confirmationResult)
                return (
                    <ScrollView style={{ padding: 20, marginTop: 20 }}>
                        <TextInput
                            value={this.state.phone}
                            onChangeText={this.onPhoneChange}
                            keyboardType="phone-pad"
                            placeholder="Your phone"
                        />
                        <Button
                            onPress={this.onPhoneComplete}
                            title="Next"
                        />
                        
                    </ScrollView>
                )
            else
                return (
                    <ScrollView style={{ padding: 20, marginTop: 20 }}>
                        <TextInput
                            value={this.state.code}
                            onChangeText={this.onCodeChange}
                            keyboardType="numeric"
                            placeholder="Code from SMS"
                        />
                        <Button
                            onPress={this.onSignIn}
                            title="Confirm Order"
                        />
                    </ScrollView>
                )
        } else if (!this.state.isOrderPlaced)
            return (
                <View>
                    {this.placeOneOrder()}
                </View>
            )
        else
            return (
                <View></View>
            )
    }
}