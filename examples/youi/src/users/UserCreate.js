/* eslint react/jsx-key: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Create,
    SaveButton,
    DisabledInput,
    SimpleForm,
    Toolbar,
    TextInput,
    DateInput,
    required,
    minLength,
    maxLength,
    RadioButtonGroupInput,
    BooleanInput,
    crudCreate,
} from 'react-admin';

import { Auth } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';

// Create custom styles for the page.
const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    inlineBlock: {
        display: 'inline-flex',
        marginRight: '1rem',
    },
    toolbar: {
        display: 'flex',
    },
};

// Create a custom toolbar with save (return to list) and save and continue to add users.
const CustomToolbar = withStyles(styles)(props => (
    <Toolbar {...props}>
        <SaveUserButton
            label="user.action.save"
            redirect="list"
            submitOnEnter={false}
        />
        <SaveButton
            label="post.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
));

class SaveUserButtonComponent extends Component {
    handleClick = () => {
        const { basePath, handleSubmit, redirect, saveUser } = this.props;
        console.log('Hello World');
        return handleSubmit(values => {
            console.log(values);
            saveUser(values, basePath, redirect);
        });
    };

    render() {
        const { handleSubmitWithRedirect, saveUser, ...props } = this.props;

        return (
            <SaveButton
                handleSubmitWithRedirect={this.handleClick}
                {...props}
            />
        );
    }
}

// Save the user through the react-admin crudCreate component.
const saveUser = (values, basePath, redirectTo) =>
    crudCreate('posts', { ...values }, basePath, redirectTo);

const SaveUserButton = connect(
    undefined,
    { saveUser }
)(SaveUserButtonComponent);

const validateName = [required(), minLength(2), maxLength(15)];
const validateEmail = [required()];
const validateUsername = [required(), minLength(4), maxLength(12)];
const PostCreate = withStyles(styles)(({ classes, ...props }) => (
    <Create title={'Create User'} {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <BooleanInput label="Active Account" source="active" />
            <DisabledInput label="Id" source="id" />
            <TextInput
                label="First Name"
                source="fname"
                validate={validateName}
                formClassName={classes.inlineBlock}
            />
            <TextInput
                source="last name"
                validate={validateName}
                formClassName={classes.inlineBlock}
            />
            <TextInput source="email" type="email" validate={validateEmail} />
            <TextInput
                source="username"
                validate={validateUsername}
                formClassName={classes.inlineBlock}
            />
            <TextInput
                source="password"
                type="password"
                formClassName={classes.inlineBlock}
            />
            <TextInput
                source="password confirm"
                type="password"
                formClassName={classes.inlineBlock}
            />
            <DateInput
                label="Activation Date"
                source="published_at"
                disabled="true"
                defaultValue={new Date()}
            />
            <RadioButtonGroupInput
                label="Role"
                source="role"
                choices={[
                    { id: 'user', name: 'User' },
                    { id: 'administrator', name: 'Administrator' },
                ]}
            />
        </SimpleForm>
    </Create>
));

export default PostCreate;
