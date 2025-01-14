/* eslint react/jsx-key: off */
import React from 'react';
import { translate } from 'react-admin';

const UserTitle = translate(({ record, translate }) => (
    <span>
        {record
            ? translate('user.edit.title', {
                  title: record.fname + ' ' + record.lname,
              })
            : ''}
    </span>
));

export default UserTitle;
