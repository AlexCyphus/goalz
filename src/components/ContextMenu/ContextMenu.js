import {onDragEnd} from "../../functions/dragLogic"
import {ContextType, useState} from 'react'
import '../../App.css';

// interface ContextMenuInterface {
//     x: number;
//     y: number;
//     itemId: string;
//     labels: object;
//     items: object;
// }

const ContextMenu = ({x, y, itemId, labels, items, updateSpecificData, toggleContextMenu}) => {
    const contextMenuOuterStyles = {
        top: y + 'px',
        left: x + 15 + 'px',
    }

    const rawContent = items[itemId].content
    const currentTicketLabel = rawContent.split(" ")[0].includes(":") ? rawContent.split(":")[0] : "blank"
    const currentTicketTitle = currentTicketLabel != "blank" ? rawContent.split(":")[1].trim() : rawContent
    const currentTicketUrl = rawContent.url ? rawContent.url : ''

    // states for current ticket values
    const [ticketTitle, updateTicketTitle] = useState(currentTicketTitle);
    const [ticketUrl, updateTicketUrl] = useState(currentTicketUrl);
    const [ticketLabel, updateTicketLabel] = useState(currentTicketLabel);
    const [labelColor, updateLabelColor] = useState(labels[ticketLabel] ? labels[ticketLabel] : false)

    // state for showing or hiding input boxes
    const defaultEditableStates = {
        title: false,
        URL: false,
        label: false
    }

    const [editStates, updateEditStates] = useState(defaultEditableStates)

    // edit pencil component
    const EditPencil = ({type}) => {
        const newState = {
            ...editStates,
            [type]: !editStates[[type]]
        }

        return (
            <span className="editPencil" onClick={() => updateEditStates(newState)}>
                ✏️
            </span>
        )
    }

    const keyDownHandler = (e, type) => { 
        let value = e.target.value
        if (e.keyCode == 13) {
            e.preventDefault()
            if (value != "") {
                updateEditStates({
                    ...editStates,
                    [type]: false
                })

                const dataType = type == 'label' ? 'colors' : 'items'

                updateSpecificData(dataType, value)
                toggleContextMenu()
            }
        }
    }

    // style input boxes properly
    // style contextBox correctly
    // create function to handle input enter and save values
    // make pencil clickable and not highlightable
    // function to close context menu 

    return (
        <div className="contextMenu-outer" style={contextMenuOuterStyles}>
            <div className="contextMenu-section">
                <p className="contextMenu-title">Title <EditPencil type="title"/></p>
                {editStates.title
                    ? <form onKeyDown={(e) => keyDownHandler(e, "title")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => updateTicketTitle(e.target.value)} value={ticketTitle}/></div>
                    </form>
                    : <p>{ticketTitle}</p>
                }            
            </div>


            <div className="contextMenu-section">
                <p className="contextMenu-title">URL <EditPencil type="URL"/></p>
                {editStates.URL 
                    ? <form onKeyDown={(e) => keyDownHandler(e, "URL")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => updateTicketUrl(e.target.value)} value={ticketUrl}/></div>
                    </form>
                    : <a href={ticketUrl}>{ticketUrl ? ticketUrl : "blank"}</a>
                }
            </div>

            <div className="contextMenu-section">
                <p className="contextMenu-title">Label <EditPencil type="label"/></p>
                {editStates.label
                    ? <form onKeyDown={(e) => keyDownHandler(e, "label")} autoComplete="off">
                        <div><textarea className="w-100 h-100 text-center" type="textArea" onChange={e => updateTicketLabel(e.target.value)} value={ticketLabel}/></div>
                    </form>
                    : <p>{ticketLabel}</p>
                }
            <span>{labelColor}</span>
            </div>
        </div>
    )
}

export default ContextMenu