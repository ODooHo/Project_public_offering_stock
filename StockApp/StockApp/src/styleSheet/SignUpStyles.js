import { StyleSheet } from 'react-native';

const signUpStyles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        padding: 12,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5
    },
    inputError: {
        borderColor: 'red'
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden', 
        alignSelf: 'center',
        justifyContent: 'center', 
        marginBottom: 45,
        marginTop: -55
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
});

export default signUpStyles;
