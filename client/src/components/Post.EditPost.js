import React, { useState } from "react";
import { Textarea, TextareaWrapper, SmallButton, CenteredText, InfoLabel, ButtonContainer, Input, InputLabel, FormWrapper, PostForm } from "components";
import { ContentContainer } from "./Post.styles";

// Page for creating a new post
export default function EditPost({ cookies, serverUrl, content, title, postid, handleCancel, setDoFetch }) {
    const [postTitle, setPostTitle] = useState(title);

    // Text of the post
    const [postText, setPostText] = useState(content);

    // Sending changes to db
    const [editing, setEditing] = useState(false);

    // Error message
    const [errorInfo, setErrorInfo] = useState("");

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handlePostChange = (e) => {
        setPostText(e.target.value);
    };

    // Sends changes to the db
    const handleSubmit = async () => {
        if (postText.length > 0) {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
                body: JSON.stringify({
                    "postid": postid,
                    "updatedArray": [
                        { "ctype": "text", "content": postTitle },
                        { "ctype": "text", "content": postText }
                    ]
                }),
            };

            try {
                setEditing(true);
                const result = await fetch(serverUrl + "posts", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setDoFetch(true);
                } else {
                    setErrorInfo("Something went wrong while editing the post");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while editing the post");
            } finally {
                setEditing(false);
            }
        }
    };

    return (
        <>
            {
                editing ? <CenteredText>Editing post...</CenteredText> :
                    <ContentContainer>
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
                                </TextareaWrapper>
                                {errorInfo.length > 0 && <InfoLabel>{errorInfo}</InfoLabel>}
                            </PostForm>
                        </FormWrapper>

                        <ButtonContainer>
                            <SmallButton onClick={handleCancel}>Cancel</SmallButton>
                            <SmallButton onClick={handleSubmit}>Accept</SmallButton>
                        </ButtonContainer>
                    </ContentContainer>
            }
        </>
    );
}