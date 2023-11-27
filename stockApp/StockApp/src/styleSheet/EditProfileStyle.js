import { StyleSheet } from 'react-native';

const EditProfileStyle = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 16,
        backgroundColor: '#f8f8f8'
    },
    image: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        alignSelf: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333'
    },
    input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
    },
    email: {
        fontSize: 16,
        color: 'gray'
    }
});

export default EditProfileStyle;
