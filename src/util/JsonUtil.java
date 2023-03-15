package util;
import java.io.IOException;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig.Feature;
public class JsonUtil {


	/**
	 * This method converts the passed object to JSON String using Jackson API
	 * 
	 * @param object
	 * @return
	 */
	public static String convertObjectToJson(Object object) throws Exception {
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(Feature.FAIL_ON_EMPTY_BEANS, false);
		try {
			
			return objectMapper.writeValueAsString(object);
		} catch (Exception exception) {
			
			return (exception).toString();
			
		}
	}

	/**
	 * @param ResponseJSON
	 *            JSON response sting
	 * @return -Response object
	 * @throws Exception
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static Object convertJsonToObject(String stringJSON, Class<?> clazz)
			throws Exception {
				ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.readValue(stringJSON, clazz);
		} catch (Exception exception) {
		
			throw exception;
		}
	}
}