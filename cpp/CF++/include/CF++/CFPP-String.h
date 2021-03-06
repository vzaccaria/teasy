/*******************************************************************************
 * Copyright (c) 2014, Jean-David Gadina - www.xs-labs.com / www.digidna.net
 * Distributed under the Boost Software License, Version 1.0.
 * 
 * Boost Software License - Version 1.0 - August 17th, 2003
 * 
 * Permission is hereby granted, free of charge, to any person or organization
 * obtaining a copy of the software and accompanying documentation covered by
 * this license (the "Software") to use, reproduce, display, distribute,
 * execute, and transmit the Software, and to prepare derivative works of the
 * Software, and to permit third-parties to whom the Software is furnished to
 * do so, all subject to the following:
 * 
 * The copyright notices in the Software and this entire statement, including
 * the above license grant, this restriction and the following disclaimer,
 * must be included in all copies of the Software, in whole or in part, and
 * all derivative works of the Software, unless such copies or derivative
 * works are solely in the form of machine-executable object code generated by
 * a source language processor.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
 * FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

/*!
 * @header      CFPP-String.h
 * @copyright   (c) 2014 - Jean-David Gadina - www.xs-labs.com / www.digidna.net
 * @abstract    CoreFoundation++ CFStringRef wrapper
 */

#ifndef CFPP_STRING_H
#define CFPP_STRING_H

namespace CF
{
    class CFPP_EXPORT String: public PropertyListType< String >
    {
        public:
            
            String( void );
            String( CFTypeRef cfObject );
            String( CFStringRef cfObject );
            String( CFTypeRef cfObject, std::string defaultValueIfNULL, CFStringEncoding encoding = kCFStringEncodingUTF8 );
            String( CFStringRef cfObject, std::string defaultValueIfNULL, CFStringEncoding encoding = kCFStringEncodingUTF8 );
            String( std::string value, CFStringEncoding encoding = kCFStringEncodingUTF8 );
            String( char * value, CFStringEncoding encoding = kCFStringEncodingUTF8 );
            String( const char * value, CFStringEncoding encoding = kCFStringEncodingUTF8 );
            String( const String & value );
            
            #ifdef CFPP_HAS_CPP11
            String( String && value );
            #endif
            
            virtual ~String( void );
            
            String & operator = ( String value );
            String & operator = ( CFTypeRef value );
            String & operator = ( CFStringRef value );
            String & operator = ( std::string value );
            String & operator = ( char * value );
            String & operator = ( const char * value );
            
            bool operator == ( const String & value ) const;
            bool operator == ( CFTypeRef value ) const;
            bool operator == ( CFStringRef value ) const;
            bool operator == ( std::string value ) const;
            bool operator == ( char * value ) const;
            bool operator == ( const char * value ) const;
            
            bool operator != ( const String & value ) const;
            bool operator != ( CFTypeRef value ) const;
            bool operator != ( CFStringRef value ) const;
            bool operator != ( std::string value ) const;
            bool operator != ( char * value ) const;
            bool operator != ( const char * value ) const;
            
            String & operator += ( const String & value );
            String & operator += ( CFStringRef value );
            String & operator += ( std::string value );
            String & operator += ( char * value );
            String & operator += ( const char * value );
            
            char operator [] ( int index ) const;
            
            operator std::string () const;
            
            virtual CFTypeID  GetTypeID( void ) const;
            virtual CFTypeRef GetCFObject( void ) const;
            
            bool HasPrefix( String value ) const;
            bool HasPrefix( CFStringRef value ) const;
            bool HasPrefix( std::string value ) const;
            bool HasSuffix( String value ) const;
            bool HasSuffix( CFStringRef value ) const;
            bool HasSuffix( std::string value ) const;
            
            CFIndex GetLength( void ) const;
            
            std::string  GetValue( CFStringEncoding encoding = kCFStringEncodingUTF8 ) const;
            const char * GetCStringValue( CFStringEncoding encoding = kCFStringEncodingUTF8 ) const;
            void         SetValue( std::string value, CFStringEncoding encoding = kCFStringEncodingUTF8 );
            
            friend void swap( String & v1, String & v2 );
            
        private:
            
            CFStringRef _cfObject;
    };
}

#endif /* CFPP_STRING_H */
