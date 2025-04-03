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
    };

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
        <>
            <BookingModal
                object={objectSelected}
                open={open}
                handleCancel={handleModalCancel}
                hanldeOk={handleModelOk}
            ></BookingModal>
            <div className="w-full flex flex-col ">
                <h1>Booking now</h1>
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-state"
                            >
                                State
                            </label>
                            <div className=" ">
                                <select
                                    // className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    value={1}
                                    defaultValue={1}
                                >
                                    <option value={1}>New Mexico</option>
                                    <option>Missouri</option>
                                    <option>Texas</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="">
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        timeZone="UTC"
                        locale={"vi"}
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
            </div>
        </>
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
