import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export default useOrientation = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = result => {
      setScreenInfo(result.screen);
    };
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription.remove('change', onChange);
  }, []);

  return {
    ...screenInfo,
    isPotrait: screenInfo.height > screenInfo.width,
  };
};
