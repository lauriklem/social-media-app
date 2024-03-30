import React, { useState } from "react";
import { Textarea, MainContent, PostForm, FormWrapper, Title, FormButton, CenteredText, InfoLabel, Input, InputLabel, TextareaWrapper } from "components";

// Page for creating a new post
export default function CreatePost({ cookies, serverUrl }) {
    // Title of the post
    const [postTitle, setPostTitle] = useState('');
    // Text of the post
    const [postText, setPostText] = useState('');

    // Creating new post
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState(false);

    // Error message
    const [errorInfo, setErrorInfo] = useState("");

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handlePostChange = (e) => {
        setPostText(e.target.value);
    };

    // Creates a new post to db
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (postText.length > 0 && postTitle.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
                body: JSON.stringify({
                    "username": cookies['username'],
                    "contentArray": [
                        { "ctype": "text", "content": postTitle },
                        { "ctype": "text", "content": postText }
                    ]
                }),
            };

            try {
                setCreating(true);
                const result = await fetch(serverUrl + "posts", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setCreated(true);
                } else {
                    setErrorInfo("Something went wrong while creating a new post");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while creating a new post");
            } finally {
                setCreating(false);
            }
        }
    };

    return (
        <MainContent>
            <Title>Create new post</Title>
            {created ? <CenteredText>New post created.</CenteredText> :
                creating ? <CenteredText>Creating post...</CenteredText> :
                    <FormWrapper>
                        <PostForm action='' onSubmit={handleSubmit}>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input
                                type='text'
                                id='title'
                                required
                                value={postTitle}
                                onChange={handleTitleChange}
                                placeholder="Title of your post"
                                maxLength='50'
                            />
                            <InputLabel htmlFor="newpost">Post</InputLabel>
                            <TextareaWrapper>
                                <Textarea
                                    name="newpost"
                                    id="newpost"
                                    required
                                    value={postText}
                                    onChange={handlePostChange}
                                    placeholder="Write your post here"
                                    rows="10"
                                />
                                <FormButton type="submit">Send</FormButton>
                            </TextareaWrapper>
                            {errorInfo.length > 0 && <InfoLabel>{errorInfo}</InfoLabel>}
                        </PostForm>
                    </FormWrapper>
            }
        </MainContent>
    );
}