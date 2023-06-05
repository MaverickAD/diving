import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./calendar.css";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import {
    Eventcalendar,
    getJson,
    setOptions,
    CalendarNav,
    SegmentedGroup,
    SegmentedItem,
    CalendarPrev,
    CalendarToday,
    CalendarNext,
    localeFr,
    Popup,
    Button,
    Input,
    Textarea,
    Switch,
    Datepicker,
    toast,
    snackbar,
} from '@mobiscroll/react';

setOptions({
    locale: localeFr,
    theme: 'ios',
    themeVariant: 'light'
});

const now = new Date();
const today = new Date(now.setMinutes(59));const defaultEvents = [{}]
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

const responsivePopup = {
    medium: {
        display: "anchored",
        width: 400,
        fullScreen: false,
        touchUi: false,
    },
};
const colorPopup = {
    medium: {
        display: "anchored",
        touchUi: false,
        buttons: [],
    },
};
const colors = [
    "#ffeb3c",
    "#ff9900",
    "#f44437",
    "#ea1e63",
    "#9c26b0",
    "#3f51b5",
    "#32ACDF",
    "#009788",
    "#4baf4f",
    "#7e5d4e",
];

function Calendar() {
    const [view, setView] = React.useState('month');
    const [myEvents, setMyEvents] = React.useState(defaultEvents);
    const [tempEvent, setTempEvent] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    //pour la liste des events sur la gauche
    /*
    const [listEvents, setListEvents] = React.useState([]);
    const [mySelectedEvent, setSelectedEvent] = React.useState([]);
    const [showList, setShowList] = React.useState(false);
    */
    //Pour le popup de modifications

    const [popupEventTitle, setTitle] = React.useState("");
    const [popupEventLocalisation, setLocalisation] = React.useState("");
    const [popupEventDescription, setDescription] = React.useState("");
    const [popupEventAllDay, setAllDay] = React.useState(true);
    const [popupEventDate, setDate] = React.useState([]);
    const [popupEventStatus, setStatus] = React.useState("busy");
    const [mySelectedDate, setSelectedDate] = React.useState(today);
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false);
    const [colorAnchor, setColorAnchor] = React.useState("#32ACDF");
    const [selectedColor, setSelectedColor] = React.useState("#32ACDF");
    const [tempColor, setTempColor] = React.useState("#32ACDF");
    const colorPicker = React.useRef();
    const colorButtons = React.useMemo(
        () => [
            "cancel",
            {
                text: "Set",
                keyCode: "enter",
                handler: () => {
                    setSelectedColor(tempColor);
                    setColorPickerOpen(false);
                },
                cssClass: "mbsc-popup-button-primary",
            },
        ],
        [tempColor]
    );
    const myInvalid = [{
        recurring: {
            repeat: 'daily',
            until: yesterday
        }
    }, {
        start: yesterday,
        end: today
    }];


    React.useEffect(() => {
        getJson('', (events) => {
            for (const event of events) {
                // convert dates to date objects
                event.start = event.start ? new Date(event.start) : event.start;
                event.end = event.end ? new Date(event.end) : event.end;
                // mark past events as fixed by setting the event.editable property to false
                event.editable = event.start && today < event.start;
            }
            setMyEvents(events);
        }, 'jsonp');
    }, []);

    const [calView, setCalView] = React.useState(
        {
            calendar: {labels: true}}

    );

    const changeView = (event) => {
        let calView;
        switch (event.target.value) {
            case 'year':
                calView = {
                    calendar: {type: 'year'}
                }
                break;
            case 'month':
                calView = {
                    calendar: {labels: true}
                }
                break;
            case 'week':
                calView = {
                    schedule: {
                        type: 'week',
                        startDay: 1,
                        endDay: 0,
                        startTime: '06:00',
                        endTime: '24:00',
                        timeCellStep: 120,
                        timeLabelStep: 120,
                        currentTimeIndicator: true,
                        allDay: false,

                    }
                }
                break;
            case 'day':
                calView = {
                    schedule: {type: 'day'}
                }
                break;
            case 'agenda':
                calView = {
                    calendar: {type: 'week'},
                    agenda: {type: 'week'}
                }
                break;
        }

        setView(event.target.value);
        setCalView(calView);
    }

    const customWithNavButtons = () => {
        return <React.Fragment>
            <CalendarNav className="cal-header-nav"/>
            <div className="cal-header-picker">
                <SegmentedGroup value={view} onChange={changeView}>
                    <SegmentedItem value="year">
                        Year
                    </SegmentedItem>
                    <SegmentedItem value="month">
                        Month
                    </SegmentedItem>
                    <SegmentedItem value="week">
                        Week
                    </SegmentedItem>
                    <SegmentedItem value="day">
                        Day
                    </SegmentedItem>
                    <SegmentedItem value="agenda">
                        Agenda
                    </SegmentedItem>
                </SegmentedGroup>
            </div>
            <CalendarPrev className="cal-header-prev"/>
            <CalendarToday className="cal-header-today"/>
            <CalendarNext className="cal-header-next"/>
        </React.Fragment>;
    }


    const saveEvent = React.useCallback(() => {
        const newEvent = {
            id: tempEvent.id,
            title: popupEventTitle,
            localisation: popupEventLocalisation,
            description: popupEventDescription,
            start: popupEventDate[0],
            end: popupEventDate[1],
            status: popupEventStatus,
            color: selectedColor,
        };
        if (isEdit) {
            // update the event in the list
            const index = myEvents.findIndex((x) => x.id === tempEvent.id);
            const newEventList = [...myEvents];

            newEventList.splice(index, 1, newEvent);
            setMyEvents(newEventList);
            // here you can update the event in your storage as well
            // ...
        } else {
            // add the new event to the list
            setMyEvents([...myEvents, newEvent]);
            // here you can add the event to your storage as well
            // ...
        }
        setSelectedDate(popupEventDate[0]);
        // close the popup
        setOpen(false);
    }, [
        isEdit,
        myEvents,
        popupEventDate,
        popupEventDescription,
        popupEventStatus,
        popupEventTitle,
        popupEventLocalisation,
        tempEvent,
        selectedColor,
    ]);

    const deleteEvent = React.useCallback(
        (event) => {
            setMyEvents(myEvents.filter((item) => item.id !== event.id));
            setTimeout(() => {
                snackbar({
                    button: {
                        action: () => {
                            setMyEvents((prevEvents) => [...prevEvents, event]);
                        },
                        text: "Undo",
                    },
                    message: "Event deleted",
                });
            });
        },
        [myEvents]
    );

    const loadPopupForm = React.useCallback((event) => {
        setTitle(event.title);
        setLocalisation(event.localisation);
        setDescription(event.description);
        setDate([event.start, event.end]);
        setStatus(event.status || "free");
        setSelectedColor(event.color || "#32ACDF");

    }, []);

    // handle popup form changes

    const titleChange = React.useCallback((ev) => {
        setTitle(ev.target.value);
    }, []);

    const localisationChange = React.useCallback((ev) => {
        setLocalisation(ev.target.value);
    }, []);

    const descriptionChange = React.useCallback((ev) => {
        setDescription(ev.target.value);
    }, []);


    const dateChange = React.useCallback((args) => {
        setDate(args.value);
    }, []);

    const statusChange = React.useCallback((ev) => {
        setStatus(ev.target.value);
        if (ev.target.value === "busy") {
        console.log("busy")
            setSelectedColor("#9B9D9E");
        }
    }, []);

    const onDeleteClick = React.useCallback(() => {
        deleteEvent(tempEvent);
        setOpen(false);
    }, [deleteEvent, tempEvent]);


    const onSelectedDateChange = React.useCallback((event) => {
        setSelectedDate(event.date);
    });

    const onEventClick = React.useCallback(
        (args) => {
            const formattedDatestart = args.event.start.toLocaleDateString(); // Récupère la date au format "jj/mm/aaaa"
            const formattedDateend = args.event.end.toLocaleDateString(); // Récupère la date au format "jj/mm/aaaa"
            const formattedTimestart = args.event.start.toLocaleTimeString(); // Récupère l'heure au format "hh:mm:ss"
            const formattedTimeend = args.event.end.toLocaleTimeString(); // Récupère l'heure au format "hh:mm:ss"
            alertify.alert()
                .setting({
                    transition: 'zoom',
                    'modal': false,
                    'closable': false,
                    'padding': 10,
                    'invokeOnCloseOff': true,
                    'pinnable': false,
                    'label': 'Ok',
                    'message': `Localisation : ${args.event.localisation} <br> Description : ${args.event.description}  <br> date début: ${formattedDatestart} ${formattedTimestart} <br> date fin : ${formattedDateend} ${formattedTimeend} <br> Status : ${args.event.status} `,
                }).setHeader(` ${args.event.title} ` ).show()

            //penser à mettre un if admin
           /* if (args.event.start && args.event.start < today && args.event.end < today ) {
                setEdit(false);
                toast({
                    message: 'Can\'t change past event'
                });
                return false;
            } else {
                setEdit(true);
                setTempEvent({...args.event});

                loadPopupForm(args.event);
                setAnchor(args.domEvent.target);
                setOpen(true);
            }*/
        },
        [loadPopupForm]
    );

    const onEventCreate = React.useCallback(
        (args) => {
            if (args.event.start && args.event.start <= today) {
                toast({
                    message: 'Can\'t create event in the past'
                });
                return false;
            }
            // createNewEvent(args.event, args.target)
            setEdit(false);
            setTempEvent(args.event);
            // fill popup form with event data
            loadPopupForm(args.event);
            setAnchor(args.target);
            // open the popup
            setOpen(true);
        },
        [loadPopupForm]
    );
    const onEventDelete = React.useCallback(
        (args) => {
            deleteEvent(args.event);
        },
        [deleteEvent]
    );

    // datepicker options
    const controls = React.useMemo(
        () => (["datetime"]),
        [popupEventAllDay]
    );
    const respSetting = React.useMemo(
        () =>
            popupEventAllDay
                ? {
                    medium: {
                        controls: ["calendar", "time"],
                        touchUi: false,
                    },
                }
                : {
                    medium: {
                        controls: ["calendar", "time"],
                        touchUi: false,
                    },
                },
        [popupEventAllDay]
    );

    // popup options
    const headerText = React.useMemo(
        () => (isEdit ? "Edit event" : "New Event"),
        [isEdit]
    );
    const popupButtons = React.useMemo(() => {
        if (isEdit) {
            return [
                "cancel",
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: "enter",
                    text: "Save",
                    cssClass: "mbsc-popup-button-primary",
                },
            ];
        } else {
            return [
                "cancel",
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: "enter",
                    text: "Add",
                    cssClass: "mbsc-popup-button-primary",
                },
            ];
        }
    }, [isEdit, saveEvent]);

    const onClose = React.useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary event
            setMyEvents([...myEvents]);
        }
        setOpen(false);
    }, [isEdit, myEvents]);

    const selectColor = React.useCallback((color) => {
        setTempColor(color);
    }, []);

    const openColorPicker = React.useCallback(
        (ev) => {
            selectColor(selectedColor || "#32ACDF");
            setColorAnchor(ev.currentTarget);
            setColorPickerOpen(true);
        },
        [selectColor, selectedColor]
    );

    const changeColor = React.useCallback(
        (ev) => {
            const color = ev.currentTarget.getAttribute("data-value");
            selectColor(color);
            if (!colorPicker.current.s.buttons.length) {
                setSelectedColor(color);
                setColorPickerOpen(false);
            }
        },
        [selectColor, setSelectedColor]
    );
    const onEventUpdate = React.useCallback((args) => {
        // here you can update the event in your storage as well, after drag & drop or resize
        const oldEvent = args.oldEvent;
        const start = oldEvent && oldEvent.start ? oldEvent.start : null;
        const oldEventOccurrence = args.oldEventOccurrence;
        const occurrenceStart = oldEventOccurrence && oldEventOccurrence.start ? oldEventOccurrence.start : null;

        // handle recurring events
        if ((start && start < today) || (occurrenceStart && occurrenceStart < today)) {
            return false;
        }
    }, []);



    const onEventUpdateFailed = React.useCallback((args) => {
        if (!args.oldEventOccurrence) {
            toast({
                message: 'Can\'t move event in the past'
            });
        }
    }, []);

    return (
        <div>
            <Eventcalendar
                renderHeader={customWithNavButtons}
                height={750}
                view={calView}
                data={myEvents}
                invalid={myInvalid}
                cssClass="md-switching-view-cont"
                clickToCreate="double"
                dragToCreat={false}
                dragToMove={true}
                dragToResize={true}
                dragTimeStep={15}
                eventDelete={true}
                selectedDate={mySelectedDate}
                onSelectedDateChange={onSelectedDateChange}
                onEventClick={onEventClick}
                onEventCreate={onEventCreate}
                onEventUpdateFailed={onEventUpdateFailed}
                onEventDelete={onEventDelete}
                onEventUpdate={onEventUpdate}

            />
            <Popup
                display="bottom"
                fullScreen={true}
                contentPadding={false}
                headerText={headerText}
                anchor={anchor}
                buttons={popupButtons}
                isOpen={isOpen}
                onClose={onClose}
                responsive={responsivePopup}
            >
                <div className="mbsc-form-group">
                    <Input label="Title" value={popupEventTitle} onChange={titleChange}/>

                    <Input label="Location" value={popupEventLocalisation} onChange={localisationChange}  />

                    <Textarea
                        label="Description"
                        value={popupEventDescription}
                        onChange={descriptionChange}
                    />
                </div>
                <button>Inscription</button>

                <div className="mbsc-form-group">
                    <Input ref={startRef} label="Starts"/>
                    <Input ref={endRef} label="Ends"/>
                    <Datepicker
                        select="range"
                        controls={controls}
                        touchUi={true}
                        startInput={start}
                        endInput={end}
                        showRangeLabels={false}
                        responsive={respSetting}
                        onChange={dateChange}
                        value={popupEventDate}
                    />
                    <div onClick={openColorPicker} className="event-color-c">
                        <div className="event-color-label">Color</div>
                        <div
                            className="event-color"
                            style={{background: selectedColor}}
                        ></div>
                    </div>
                    <SegmentedGroup onChange={statusChange}>
                        <SegmentedItem value="busy" checked={popupEventStatus === "busy"}>
                            Show as busy
                        </SegmentedItem>
                        <SegmentedItem value="free" checked={popupEventStatus === "free"}>
                            Show as free
                        </SegmentedItem>
                    </SegmentedGroup>
                    {isEdit ? (
                        <div className="mbsc-button-group">
                            <Button
                                className="mbsc-button-block"
                                color="danger"
                                variant="outline"
                                onClick={onDeleteClick}
                            >
                                Delete event
                            </Button>
                        </div>
                    ) : null}
                </div>
            </Popup>
            <Popup
                display="bottom"
                contentPadding={false}
                showArrow={false}
                showOverlay={false}
                anchor={colorAnchor}
                isOpen={colorPickerOpen}
                buttons={colorButtons}
                responsive={colorPopup}
                ref={colorPicker}
            >
                <div className="crud-color-row">
                    {colors.map((color, index) => {
                        if (index < 5) {
                            return (
                                <div
                                    key={index}
                                    onClick={changeColor}
                                    className={
                                        "crud-color-c " + (tempColor === color ? "selected" : "")
                                    }
                                    data-value={color}
                                >
                                    <div
                                        className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
                                        style={{background: color}}
                                    ></div>
                                </div>
                            );
                        } else return null;
                    })}
                </div>
                <div className="crud-color-row">
                    {colors.map((color, index) => {
                        if (index >= 5) {
                            return (
                                <div
                                    key={index}
                                    onClick={changeColor}
                                    className={
                                        "crud-color-c " + (tempColor === color ? "selected" : "")
                                    }
                                    data-value={color}
                                >
                                    <div
                                        className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
                                        style={{background: color}}
                                    ></div>
                                </div>
                            );
                        } else return null;
                    })}
                </div>
            </Popup>
        </div>
    );
}

export default Calendar;