import React from 'react';
import { Progress } from 'antd';
import {ProgressBarProps} from './ProgressBar.d';


export default function ProgressBar({ progress }: ProgressBarProps): JSX.Element {
  return <Progress percent={progress} strokeColor={'#10BAAC'} size={['100%', 10]} />;
}
