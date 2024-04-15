import { FunctionComponent, useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface PhotoUploadWidgetProps {
    uploadPhoto: (blog: Blob) => void;
    loading: boolean;
}

const PhotoUploadWidget: FunctionComponent<PhotoUploadWidgetProps> = ({uploadPhoto, loading}) => {
    const [files, setFile] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!)
            )
        }
    }
    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])
    return (<Grid>
        <Grid.Column width={4}>
            <Header sub color="teal" content='Step 1 - add photo' />
            <PhotoWidgetDropzone setFile={setFile} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
            <Header sub color="teal" content='Step 2 - resize photo' />
            {files && files.length > 0 && (
                <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
            )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
            <Header sub color="teal" content='Step  3 - preview & upload' />
            {files && files.length > 0 &&
            <>
            <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
            <Button.Group widths={2}>
                <Button loading={loading} onClick={onCrop} positive icon='check' />
                <Button loading={loading} onClick={() => setFile([])} icon='close' />
            </Button.Group>
            </>
            }
        </Grid.Column>
    </Grid>);
}

export default PhotoUploadWidget;