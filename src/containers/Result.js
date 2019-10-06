import React from 'react';
import { Progress } from 'antd';
const Result = ( props ) => {
    return(
    <div>
        <Progress type="circle" percent={props.grade} width={80} />
    </div>
    )}

export default Result
 