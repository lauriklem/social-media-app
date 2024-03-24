import React, { useState } from "react";
import { Textarea, TextareaWrapper, SmallButton, CenteredText, InfoLabel, ButtonContainer } from "components";

// Page for creating a new post
export default function EditPost({ cookies, serverUrl, content, postid, handleCancel }) {
    // Text of the post
    const [postText, setPostText] = useState(content);

    // Sending changes to db
    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState(false);

    // Error message
    const [errorInfo, setErrorInfo] = useState("");

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
                    "updatedArray": [{ "ctype": "text", "content": postText }]
                }),
            };

            try {
                setEditing(true);
                const result = await fetch(serverUrl + "posts", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setEdited(true);
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
            {edited ? <CenteredText>Post edited successfully.</CenteredText> :
                editing ? <CenteredText>Editing post...</CenteredText> :
                    <>
                        <TextareaWrapper>
                            <Textarea
                                name="newpost"
                                id="newpost"
                                value={postText}
                                onChange={handlePostChange}
                                placeholder="Write your post here"
                                rows="10"
                            />

                            {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                        </TextareaWrapper>
                        <ButtonContainer>
                            <SmallButton onClick={handleCancel}>Cancel</SmallButton>
                            <SmallButton onClick={handleSubmit}>Accept</SmallButton>
                        </ButtonContainer>
                    </>
            }
        </>
    );
}