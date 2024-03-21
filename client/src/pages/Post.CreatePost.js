import React, { useState } from "react";
import { Textarea, MainContent, TextareaWrapper, Title, Button, CenteredText, InfoLabel } from "components";

// Page for creating a new post
export default function CreatePost({ cookies, serverUrl }) {
    // Text of the post
    const [postText, setPostText] = useState('');

    // Creating new post
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState(false);

    // Error message
    const [errorInfo, setErrorInfo] = useState("");

    const handlePostChange = (e) => {
        setPostText(e.target.value);
    };

    // Creates a new post to db
    const handleSubmit = async () => {
        if (postText.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
                body: JSON.stringify({
                    "username": cookies['username'],
                    "contentArray": [{ "ctype": "text", "content": postText }]
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
                    <TextareaWrapper>
                        <Textarea
                            name="newpost"
                            id="newpost"
                            value={postText}
                            onChange={handlePostChange}
                            placeholder="Write your post here"
                            rows="10"
                        />
                        <Button onClick={handleSubmit}>Send</Button>
                        {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                    </TextareaWrapper>
            }
        </MainContent>
    );
}