import { Platform, ScrollView, View } from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import Heading from '../../Components/ReusableComponent/Heading';
import { useEffect, useState } from 'react';
import { getRequestWithOutBody, putRequestWithToken } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { useSelector } from 'react-redux';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const NotificationDetails = ({ route }) => {
    const AuthReducer = useSelector(state => state.AuthReducer?.userData);
    // const notificationId = route.params?.id 
    console.log('route.params on details', route.params?.id)
    const [notificationId, setNotificationId] = useState();
    const [details, setDetails] = useState();
    const [loader, setloader] = useState(false);
    console.log('details on detailsaaa', notificationId)

    useEffect(() => {
        setNotificationId(route.params?.id)
    }, []);

    useEffect(() => {
        var formdata = new FormData();
        formdata.append('is_read', 'True');
        formdata.append('notification_id', route.params?.id);
        setloader(true)
        putRequestWithToken(
            `${BASE_URL}/notifications/update-notification/`,
            formdata,
            AuthReducer.token,
        )
            .then(result => {
                setloader(false)
                // console.log('result at notificationaaaaaa', result)
                // setDetails(result.results)
            })
            .catch(error => {
                setloader(false)
                console.log('erroraaa', error);
            });
    }, [notificationId]);

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <View
                    style={{
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        flex: 1,
                        marginVertical: '8%',
                    }}>
                    <View
                        style={{
                            marginBottom: 20,
                            marginTop: Platform.OS === 'ios' ? 0 : '-5%',
                        }}>
                        <Head head={'Notification Details'} />
                    </View>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            marginTop: Platform.OS === 'ios' ? -10 : '-5%',
                        }}>
                        <View style={{ marginHorizontal: '4%', marginTop: '10%' }}>
                            <Heading
                                //   Stylefont={'normal'}
                                Fontweight={'bold'}
                                Fontsize={18}
                                Heading={route.params?.title}
                                color={'#0B105C'}
                            />
                            <Heading
                                Stylefont={'normal'}
                                Fontsize={13}
                                Heading={route.params?.body}
                                color={'#7B869E'}
                                mt={'4%'}
                            />
                        </View>

                    </ScrollView>
                </View>
            )}
        </>
    );
};
