import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useState } from 'react';
import {
  Dimensions,
  Linking
} from 'react-native';
import { useDispatch } from 'react-redux';


const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window');

export const CustomDrawerContent = (propsParent: any) => {
    const [result, setResult] = useState(null);
    const [marketLink, setMarketList] = useState('https://play.google.com/store/apps/details?id=com.app');
    const [facebookShareURL, setFacebookShareURL] = useState(
        'https://play.google.com/store/apps/details?id=com.app',
      );
      const [postContent, setPostContent] = useState(
        'mensajee',
      );
    const _handlePressButtonAsync = async () => {
        let facebookParameters = [];
        if (facebookShareURL)
          facebookParameters.push('u=' + encodeURI(facebookShareURL));
        if (postContent)
          facebookParameters.push('quote=' + encodeURI(postContent));
        const url =
          'https://www.facebook.com/sharer/sharer.php?'
           + facebookParameters.join('&');
        let result = await WebBrowser.openBrowserAsync(url);
        setResult(result);
      };
      const _handleiNSTAGRAM = async () => {
          let facebookParameters = [];
          if (facebookShareURL)
            facebookParameters.push('u=' + encodeURI(facebookShareURL));
          if (postContent)
            facebookParameters.push('quote=' + encodeURI(postContent));
          const url =
            'https://www.facebook.com/sharer/sharer.php?'
             + facebookParameters.join('&');
          let result = await WebBrowser.openBrowserAsync(url);
          setResult(result);
        };

      
    
      const postOnFacebook = () => {
        let facebookParameters = [];
        if (facebookShareURL)
          facebookParameters.push('u=' + encodeURI(facebookShareURL));
        if (postContent)
          facebookParameters.push('quote=' + encodeURI(postContent));
        const url =
          'https://www.facebook.com/sharer/sharer.php?'
           + facebookParameters.join('&');
    
        Linking.openURL(url)
          .then((data) => {
            alert('Facebook Opened');
          })
          .catch(() => {
            alert('Something went wrong');
          });
      };

    const dispatch = useDispatch();
    return (
        <>
        </>
    );
};
