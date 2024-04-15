import { CSSProperties, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';
interface Props {
    setFile: (file: any) => void;

}
export default function PhotoWidgetDropzone({setFile}: Props) {
    const dzStyle: CSSProperties = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        paddingTop: '30px',
        borderRadius: '5px',
        textAlign: 'center',
        height: 200
    }
    const dzActive = {
        borderColor: 'green'

    }
    const onDrop = useCallback((acceptedFiles: object[]) => {
        setFile(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFile])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyle, ...dzActive} : dzStyle}>
            <input {...getInputProps()} />
           <Icon name='upload' size='huge'/>
           <Header content='Drop image here'/>
        </div>
    )
}