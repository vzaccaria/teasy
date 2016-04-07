.. highlight:: c++

.. _string-formatting-api:

*************
API Reference
*************

All functions and classes provided by the C++ Format library reside
in namespace ``fmt`` and macros have prefix ``FMT_``. For brevity the
namespace is usually omitted in examples.

Formatting functions
====================

The following functions use :ref:`format string syntax <syntax>` similar
to the one used by Python's `str.format
<http://docs.python.org/3/library/stdtypes.html#str.format>`_ function.
They take *format_str* and *args* as arguments.

*format_str* is a format string that contains literal text and replacement
fields surrounded by braces ``{}``. The fields are replaced with formatted
arguments in the resulting string.

*args* is an argument list representing arbitrary arguments.

.. _format:

.. doxygenfunction:: fmt::format(StringRef, ArgList)

.. _print:

.. doxygenfunction:: fmt::print(StringRef, ArgList)

.. doxygenfunction:: fmt::print(std::FILE *, StringRef, ArgList)

.. doxygenfunction:: fmt::print(std::ostream &, StringRef, ArgList)

Printf formatting functions
===========================

The following functions use `printf format string syntax
<http://pubs.opengroup.org/onlinepubs/009695399/functions/fprintf.html>`_ with
a POSIX extension for positional arguments.

.. doxygenfunction:: fmt::printf(StringRef, ArgList)

.. doxygenfunction:: fmt::fprintf(std::FILE *, StringRef, ArgList)

.. doxygenfunction:: fmt::sprintf(StringRef, ArgList)

Write API
=========

.. doxygenclass:: fmt::BasicWriter
   :members:

.. doxygenclass:: fmt::BasicMemoryWriter
   :members:

.. doxygenfunction:: fmt::bin

.. doxygenfunction:: fmt::oct

.. doxygenfunction:: fmt::hex

.. doxygenfunction:: fmt::hexu

.. doxygenfunction:: fmt::pad(int, unsigned, Char)

Utilities
=========

.. doxygendefine:: FMT_VARIADIC

.. doxygenclass:: fmt::ArgList
   :members:

.. doxygenclass:: fmt::BasicStringRef
   :members:

System Errors
=============

.. doxygenclass:: fmt::SystemError
   :members:

.. doxygenclass:: fmt::WindowsError
   :members:

.. _formatstrings:

Custom allocators
=================

The C++ Format library supports custom dynamic memory allocators.
A custom allocator class can be specified as a template argument to
:cpp:class:`fmt::BasicMemoryWriter`::

    typedef fmt::BasicMemoryWriter<char, CustomAllocator> CustomMemoryWriter;

It is also possible to write a formatting function that uses a custom
allocator::

    typedef std::basic_string<char, std::char_traits<char>, CustomAllocator> CustomString;

    CustomString format(CustomAllocator alloc, fmt::StringRef format_str,
                        fmt::ArgList args) {
      CustomMemoryWriter writer(alloc);
      writer.write(format_str, args);
      return CustomString(writer.data(), writer.size(), alloc);
    }
    FMT_VARIADIC(CustomString, format, CustomAllocator, fmt::StringRef)
