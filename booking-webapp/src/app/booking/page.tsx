"use client";
import BookingModal from "@/components/BookingModal";
import { UserSelected } from "@/interfaces/Booking";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { stompClient } from "../Utils";
import { bookingService } from "@/api";

type CustomEventInput = EventInput & {
    userId?: string;
    locked: boolean;
};

function BookingPage() {
    const [open, setOpen] = useState(false);
    const [objectSelected, setObjectSelected] = useState<UserSelected>({});
    const [events, setEvents] = useState<CustomEventInput[]>([]);

    const fetchBooking = async () => {
        try {
            const bookingRes = await bookingService.getAll();
            console.log(bookingRes);


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!stompClient.active) {
            stompClient.activate();
        }
        fetchBooking();

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const handleModalCancel = () => {
        setOpen(false);
    };

    const handleModelOk = () => {
        setOpen(false);
    };


    return (
        <div className="container ">
            <BookingModal
                object={objectSelected}
                open={open}
                handleCancel={handleModalCancel}
                hanldeOk={handleModelOk}
            ></BookingModal>
            <h1>Demo App</h1>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                timeZone="UTC"
                initialView="timeGridWeek"
                weekends={false}
                events={events}
                select={function (e) {
                    let tempEvents = events;
                    let a: any = e.start;
                    let b: any = e.end;
                    let isCancel: boolean = false;
                    tempEvents = tempEvents.filter((event, index) => {
                        const c = event.start;
                        const d = event.end;

                        if (!c || !d) {
                            return true;
                        }

                        if (a <= c && b >= d) {
                            if (event.locked == true) {
                                isCancel = true;
                                return true;
                            }
                            return false;
                        }
                        if ((a > c && a < d) || (b > c && b < d)) {
                            if (a > c) {
                                a = c;
                            }
                            if (b < d) {
                                b = d;
                            }
                            if (event.locked == true) {
                                isCancel = true;
                                return true;
                            }
                            return false;
                        }
                        return true;
                    });

                    if (!isCancel) {
                        setEvents([
                            ...tempEvents,
                            { id: v4() + "", start: a, end: b, backgroundColor: "orange", locked: false },
                        ]);
                    }
                }}
                // editable={true}
                // droppable={true}
                eventClick={(e) => {
                    setEvents(events.filter((event) => event.locked || event.id !== e.event.id));
                }}
                selectable={true}
                eventContent={renderEventContent}
            />
        </div>
    );
}
function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </div>
    );
}
export default BookingPage;
